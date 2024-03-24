
import { ObjectId } from 'mongodb';
import  clientPromise  from '../lib/mongodb';



/**
* @swagger
* /api/movies:
*   get:
*       summary: retourne tous les films
*       description: retourne tous les films
*       responses:
*           200:
*               description: Hello Movies
*/
export async function getAllMovies() {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const data = await db.collection("movies").find({}).limit(10).toArray();
    return data;
}

/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *     summary: Recupérer un film
 *     description: Récupère un film à partir de son identifiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Film récupéré avec succès.
 *       404:
 *         description: Film non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de la récupération du film.
 */
export async function getMovieById(id) {
    
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    return await db.collection('movies').findOne({ _id: new ObjectId(id) });
}

/**
 * @swagger
 * /api/movie:
 *   post:
 *     summary: Ajoute un nouveau film
 *     description: Ajoute un nouveau film à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Film ajouté avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Une erreur est survenue lors de l'ajout du film.
 */
export async function addMovie(movieData) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const result = await db.collection('movies').insertOne(movieData);
    const insertedId = result.insertedId;
    return insertedId;
      
}

/**
 * @swagger
 * /api/movie/{id}:
 *   put:
 *     summary: met à jour un film
 *     description: Met à jour un film existant à partir de son identifiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Film mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Film non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de la mise à jour du film.
 */
export async function updateMovieById(id, updatedMovieData) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    return await db.collection('movies').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedMovieData }
    );
}


/**
 * @swagger
 * /api/movie/{id}:
 *   delete:
 *     summary: supprime un film
 *     description: Supprime un film existant à partir de son identifiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Film supprimé avec succès.
 *       404:
 *         description: Film non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de la suppression du film.
 */
export async function deleteMovieById(id) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    return await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
}
