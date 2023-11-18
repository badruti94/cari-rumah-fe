import { Card, Row } from "reactstrap"
import Layout from "../../components/layout"
import SearchForm from "../../components/searchForm"
import PaginationComponent from "../../components/pagination"
import ItemGrid from "../../components/itemGrid"
import { SwalLoading } from '../../utils/swal-fire'
import { useEffect, useState } from "react"
import { API } from '../../config/api'
import { useDispatch, useSelector } from "react-redux"
import { updatePage, updateTotalData } from "../../config/redux/action"

const Home = () => {
  const dispatch = useDispatch()
  const [houses, setHouses] = useState([])
  const { page, perPage } = useSelector(state => state.paginationReducer)

  const getData = async () => {
    const Swal = SwalLoading()

    const result = await API.get(`/house?page=${page}perPage=${perPage}`)
    Swal.close()
    setHouses(result.data.data)
    dispatch(updateTotalData(parseInt(result.data.total_data)))

  }

  useEffect(() => {
    dispatch(updatePage(1))
  }, [])
  useEffect(() => {
    try {
      getData()
    } catch (error) {
      console.log(error);
    }
  }, [page])

  return (
    <Layout>
      <Card
        className="mx-auto mb-5"
        style={{ maxWidth: '600px' }}
      >

        <SearchForm />
      </Card>
      <Row className="row-cols-2 row-cols-md-4 g-4">
        {houses && houses.map(house => <ItemGrid key={house.id} data={house} />)}

      </Row>

      <PaginationComponent />

    </Layout>
  )
}

export default Home