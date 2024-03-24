
import { getAllMovies } from '../../services/moviesServices';



export default async function handler(req, res) {
    try {
        const movies = await getAllMovies();
        res.status(200).json({ success: true, data: movies });
        } catch (error) {
             res.status(500).json({ success: false, error: error.message });
    }  
}
