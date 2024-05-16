import { useEffect, useState } from "react"
import './index.css';
import { Table, Button, Modal, Input } from 'antd';
import { Link } from "react-router-dom"
import { useArrayContext } from "../../Context";


const TablePage = ({ searchCategory, searchDescription, searchName }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const { products, setProducts } = useArrayContext();
    const [fileteredProducts, setFileteredProducts] = useState()

    const columns = [{
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => `$${text}`, // Format price
    }, {
        title: "Actions",
        key: "Actions",
        render: (record) => {
            return (
                <div className="edit-delete">
                    <Button onClick={() => {
                        onEditProduct(record)
                    }} className="buttons">Edit</Button>
                    <Button onClick={() => {
                        onDeleteProduct(record)
                    }} className="delete-button">Delete</Button>
                </div>
            )
        }
    },]

    const onDeleteProduct = (record) => {
        console.log(record)
        setProducts(pre => {
            return pre.filter(product => product.key !== record.key)
        })
    }

    const onEditProduct = (record) => {
        setIsEditing(true)
        setEditingProduct(record)
    }

    const resetEditing = () => {
        setIsEditing(false)
        setEditingProduct(null)
    }

    useEffect(() => {
        let updatedProducts = products;
        if (searchName.length > 0) {
            updatedProducts = updatedProducts.filter(product => product.name.toLowerCase().includes(searchName));
        }
        if (searchDescription.length > 0) {
            updatedProducts = updatedProducts.filter(product => product.description.includes(searchDescription));
        }
        if (searchCategory?.length > 0) {
            updatedProducts = updatedProducts.filter(product => product.category === searchCategory);
        }
        setFileteredProducts(updatedProducts)
    }, [searchDescription, searchName, searchCategory,products])


    return (
        <div className="table-page">
            <Link to="/addproduct">
                <Button className="add-button">Add Product</Button>
            </Link>

            <Table className="table-container"
                columns={columns}
                dataSource={fileteredProducts}
            />
            <Modal
                title="Product Editing"
                visible={isEditing}
                okText="Save"
                onCancel={() => {
                    resetEditing()

                }}
                onOk={() => {
                    setProducts(pre => {
                        return pre.map(product => {
                            if (product.key === editingProduct.key) {
                                return editingProduct
                            }
                            else {
                                return product
                            }
                        })
                    })
                    resetEditing()
                }}
            >
                <Input value={editingProduct?.name} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, name: e.target.value }
                    })
                }} />
                <Input value={editingProduct?.category} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, category: e.target.value }
                    })
                }} />
                <Input value={editingProduct?.description} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, description: e.target.value }
                    })
                }} />
                <Input value={editingProduct?.price} onChange={(e) => {
                    setEditingProduct(pre => {
                        return { ...pre, price: e.target.value }
                    })
                }} />

            </Modal>
        </div>
    )
}

export default TablePage