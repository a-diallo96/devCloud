
import { getAllCommentsByMovieId } from "../../../../services/commentsService";

    export default async function handler(req, res) {
        const { idMovie } = req.query
        try {
            const comments = await getAllCommentsByMovieId(idMovie)
            res.status(200).json({ success: true, data: comments });
            } catch (error) {
                 res.status(500).json({ success: false, error: error.message });
        }  
    
    
}
    
