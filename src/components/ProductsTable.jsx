import { Table } from 'antd';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        render: (_, record) => {
            return <img src={record.image} alt={record.title} width={100} />
        }
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Sub Title',
      dataIndex: 'subtitle',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      render: (_, record) => {
        return <EditProduct productId={record._id} />
      }
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (_, record) => {
        return <DeleteProduct productId={record._id} />
      }
    }
  ];

function ProductsTable({ products }) {
  return (
    <div>
      <Table columns={columns} dataSource={products} size="small" />  
    </div>
  )
}

export default ProductsTable
