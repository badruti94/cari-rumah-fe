import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { useEffect, useState } from "react"
import { API, getConfig } from "../../config/api"
import { useNavigate, useParams } from "react-router-dom"
import { SwalLoading, SwalFire } from '../../utils/swal-fire'

const ItemAdd = () => {
  const navigate = useNavigate()

  const [house, setHouse] = useState({
    name: '',
    price: '',
    description: '',
    address: '',
    image: '',
  })
  const [imgPreview, setImgPreview] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const params = useParams()

  useEffect(() => {
    const getData = async () => {
      const Swal = SwalLoading()

      const result = await API.get('/house/' + id)
      Swal.close()

      setHouse(result.data.data)
      setImgPreview(result.data.data.image)
    }
    const { id } = params
    if (id) {
      setIsEdit(true)
      getData()
    }
  }, [])

  const handleChange = (e) => {
    setHouse({ ...house, [e.target.name]: e.target.value })
  }
  const handleChangeImage = (e) => {
    setHouse({ ...house, image: e.target.files[0] })
    setImgPreview(URL.createObjectURL(e.target.files[0]))
  }
  const handleSubmit = async (e) => {
    const Swal = SwalLoading()
    try {
      e.preventDefault()

      const formData = new FormData()
      formData.append('name', house.name)
      formData.append('price', house.price)
      formData.append('description', house.description)
      formData.append('address', house.address)
      formData.append('image', house.image)

      const config = await getConfig()

      let result;
      if (isEdit) {
        result = await API.put('/house/' + params.id, formData, config)
      } else {
        result = await API.post('/house', formData, config)
      }
      Swal.close()
      navigate('/house')

    } catch (error) {
      Swal.close()
      SwalFire('error', error.response.data.message)
      console.log(error);
    }
  }

  return (
    <Layout>
      <Card
        className="mx-auto"
        style={{ width: '50rem' }}
      >
        <CardBody
        >
          <p className="text-center pb-4 fs-3 fw-bold"
          >{isEdit ? 'Edit' : 'Add'} House</p>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={house.name}
                onChange={handleChange}
                placeholder="Name"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                value={house.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={house.description}
                onChange={handleChange}
                placeholder="Description"
                type="textarea"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={house.address}
                onChange={handleChange}
                placeholder="Address"
                type="textarea"
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">
                Image
              </Label> <br />
              {imgPreview && <img
                alt="Sample"
                src={imgPreview}
                style={{ width: '300px' }}
                className="mx-auto"
              />}

              <Input
                id="image"
                name="image"
                onChange={handleChangeImage}
                placeholder="Image"
                type="file"
                className="mt-2"
              />
            </FormGroup>
            <Button color="primary">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>

    </Layout>
  )
}

export default ItemAdd