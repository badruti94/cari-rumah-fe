import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { API, getConfig } from "../../config/api"
import { confirmAlert } from 'react-confirm-alert';

const ItemListTable = ({ data, getData }) => {
    const navigate = useNavigate()

    const { id, name, price, sold } = data
    const handleEdit = async () => {
        try {
            navigate('/house/edit/' + id)
        } catch (error) {
            console.log(error);
        }
    }
    const handleSetSold = async () => {
        try {
            const setSoldHouse = async () => {
                const config = await getConfig()
                const result = await API.patch(`/house/${id}/sold`, config)
                getData()
            }

            const options = {
                title: 'Set Sold House',
                message: 'Are you sure want to set sold this house?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: setSoldHouse
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
                keyCodeForClose: [8, 32],
                overlayClassName: "overlay-custom-class-name"
            };

            confirmAlert(options);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {
        try {
            const deleteItem = async () => {
                const config = await getConfig()
                const result = await API.delete('/house/' + id, config)
                getData()
            }

            const options = {
                title: 'Delete Item',
                message: 'Are you sure want to delete this item?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: deleteItem
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
                keyCodeForClose: [8, 32],
                overlayClassName: "overlay-custom-class-name"
            };

            confirmAlert(options);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDetail = async () => {
        try {
            navigate('/house/' + id)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                Rp {price}
            </td>
            <td>
                {sold ? 'Sold' : 'Not Sold Yet'}
            </td>
            <td className="text-center" >
                <Button onClick={handleEdit} className="me-2" color="warning" >Edit</Button>
                <Button onClick={handleDelete} className="me-2" color="danger">Delete</Button>
                <Button onClick={handleDetail} className="me-2" color="primary">Detail</Button>
                <Button onClick={handleSetSold} className="me-2" color="success">Set Sold</Button>
            </td>
        </tr>
    )
}

export default ItemListTable