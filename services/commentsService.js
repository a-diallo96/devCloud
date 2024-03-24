
import { ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb';

/**
 * @swagger
 * /api/movie/{movieId}/comments:
 *   get:
 *     summary: Récupère tous les commentaires d'un film par son ID
 *     description: Récupère tous les commentaires liés à un film à partir de son identifiant.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID du film pour lequel récupérer les commentaires.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès.
 *       404:
 *         description: Aucun commentaire trouvé pour le film spécifié.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des commentaires.
 */
export async function getAllCommentsByMovieId(movieId) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    return await db.collection('comments').find({movie_id: new ObjectId(movieId)}).toArray();
}


/**
 * @swagger
 * /api/movie/{movieId}/comment/{commentId}:
 *   get:
 *     summary: Récupère un commentaire par son ID et l'ID du film
 *     description: Récupère un commentaire à partir de son identifiant et de l'identifiant du film auquel il est associé.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID du film auquel le commentaire est associé.
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès.
 *       404:
 *         description: Commentaire non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de la récupération du commentaire.
 */
export async function getCommentById(movieId, commentId) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    return await db.collection("comments").findOne({ _id: new ObjectId(commentId), movie_id: new ObjectId(movieId) });

}

/**
 * @swagger
 * /api/comments/{movieId}:
 *   post:
 *     summary: Ajoute un nouveau commentaire à un film
 *     description: Ajoute un nouveau commentaire à un film spécifié.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID du film auquel ajouter le commentaire.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentData'
 *     responses:
 *       201:
 *         description: Commentaire ajouté avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Film non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de l'ajout du commentaire.
 */
export async function addComment(movieId, commentData) {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const commentResult = await db.collection('comments').insertOne({
            movie_id: new ObjectId(movieId),
          ...commentData
        });
  
        const commentId = commentResult.insertedId;

        const movieResult = await db.collection('movies').updateOne(
          { _id: new ObjectId(movieId) },
          { $push: { comments: commentId } }
        );
  
        if (movieResult.modifiedCount === 0) {
          throw new Error('Le commentaire n\'a pas pu être ajouté au film.');
        }
  
        return commentData;
      } catch (error) {
        throw new Error(`Erreur lors de l'ajout du commentaire au film : ${error.message}`);
      }
}
      

/**
 * @swagger
 * /api/comments/{movieId}/{commentId}:
 *   put:
 *     summary: Met à jour un commentaire par son ID et l'ID du film
 *     description: Met à jour un commentaire à partir de son identifiant et de l'identifiant du film auquel il est associé.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID du film auquel le commentaire est associé.
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatedCommentData'
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Commentaire non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de la mise à jour du commentaire.
 */
export async function updateCommentById(commentId, movieId, updatedCommentData) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    try {
        const movie = await db.collection('movies').findOne({ _id: new ObjectId(movieId) });
        
        if (!movie) {
          throw new Error('Le film spécifié n\'existe pas.');
        }

        const commentIndex = movie.comments.findIndex(id => id.toString() === commentId);
        if (commentIndex === -1) {
          throw new Error('Le commentaire spécifié n\'existe pas dans le film.');
        }

        const commentResult = await db.collection('comments').updateOne(
          { _id: new ObjectId(commentId)},
          { $set: updatedCommentData }
        );

        if (commentResult.modifiedCount === 0) {
          throw new Error('Le commentaire n\'a pas pu être trouvé ou mis à jour.');
        }

        return updatedCommentData;
      } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du commentaire : ${error.message}`);
      }
    
}


/**
 * @swagger
 * /api/comments/{movieId}/{commentId}:
 *   delete:
 *     summary: Supprime un commentaire par son ID et l'ID du film
 *     description: Supprime un commentaire à partir de son identifiant et de l'identifiant du film auquel il est associé.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID du film auquel le commentaire est associé.
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès.
 *       404:
 *         description: Commentaire non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de la suppression du commentaire.
 */

export async function deleteCommentForMovie(commentId, movieId) {
    
      const client = await clientPromise;
      const db = client.db("sample_mflix");
    try{

      const result = await db.collection('comments').deleteOne({
        _id: new ObjectId(commentId),
        movie_id: new ObjectId(movieId)
      });

      if (result.modifiedCount === 0) {
        throw new Error('Le commentaire n\'a pas pu être trouvé ou supprimé du film.');
      }

      return { success: true };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression du commentaire pour le film : ${error.message}`);
    }
}


 