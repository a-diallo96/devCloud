
import {  addMovie,  updateMovieById, deleteMovieById, getMovieById} from '../../../services/moviesServices';



export default async function handler(req, res) {

    const { method, query: { idMovie } } = req; 


    switch(req.method) {
        case 'GET':
            try {
                const movie = await getMovieById(idMovie[0]);
                res.status(200).json({ success: true, data: movie });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;
        case 'POST':
            // Ajouter un film
            try {
                const newMovie = req.body; 
                const result = await addMovie(newMovie);
                res.status(201).json({ success: true, data: result});
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;
        case 'PUT':
            // Modifier un film
            try {
                const updatedMovie = req.body;
                console.log(req.body)
                const result = await updateMovieById(idMovie[0], updatedMovie);
                res.status(200).json({ success: true, data: result });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;
        case 'DELETE':
            try {
                const result = await deleteMovieById(idMovie[0]);
                res.status(200).json({ success: true, data: result });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }

            break;
        default:
            res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
    }


    }



