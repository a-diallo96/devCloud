import {getAllCommentsByMovieId, getCommentById, addComment, updateCommentById, deleteCommentForMovie} from '../../../../../services/commentsService';



export default async function handler(req, res) {
    const { method, query: { idMovie, idComment } } = req;


    switch (method) {
        case 'GET':
            try {
                const comment = await getCommentById(idMovie, idComment[0]);
                if (!comment) {
                    res.status(404).json({ success: false, message: 'Comment not found' }); 
                    return;
                }
                res.status(200).json({ success: true, data: comment });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;
            case 'POST':
                // Ajouter un commentaire
                try {
                    const newComment = req.body; 
                    const result = await addComment(idMovie,newComment);
                    res.status(201).json({ success: true, data: result});
                } catch (error) {
                    res.status(500).json({ success: false, error: error.message });
                }
            break;
            case 'PUT':
                try {

                    const updatedComment = req.body;
                    console.log(updatedComment)
                    const result = await updateCommentById(idComment[0], idMovie, updatedComment)
                    res.status(200).json({ success: true, data: result });
                } catch (error) {
                    res.status(500).json({ success: false, error: error.message });
                }
                break;
            case 'DELETE':
                try {
                    console.log("ok")
                    const result = await deleteCommentForMovie(idComment[0], idMovie)
                    res.status(200).json({ success: true, data: result });
                } catch (error) {
                    res.status(500).json({ success: false, error: error.message });
                }
                break;
        
        default:
            res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
    }
}
