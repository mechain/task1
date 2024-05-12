import { useState } from "react"

export default function Home() {
    const [order, setOrder] = useState({ name: '', quantity: 0, warehouse: '' })
    return <div style={{
        display: 'flex',
        flexDirection: "column",
        gap: '10px'
    }}>
        <label>
            Product Name
            <input value={order.name} onChange={e => {
                setOrder(prev => ({ ...prev, name: e.target.value }))
            }} />
        </label>
        <label>
            Quantity
            <input value={order.name} type="number" onChange={(e) =>
                setOrder(prev => ({ ...prev, quantity: e.target.valueAsNumber }))
            } />
        </label>
        <label>
            Warehouse
            <input value={order.name} type="text" onChange={(e) =>
                setOrder(prev => ({ ...prev, warehouse: e.target.value }))
            } />
        </label>
        <button>Create Order</button>
    </div>
}