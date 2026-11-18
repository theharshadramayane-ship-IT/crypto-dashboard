import { TrendingUp, TrendingDown } from 'lucide-react'

export default function CoinCard({ coin }) {
  const isPositive = coin.price_change_percentage_24h >= 0

  return (
    <div style={{
      background: 'var(--panel-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      transition: 'transform 0.2s, border-color 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.borderColor = 'var(--accent-blue)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.borderColor = 'var(--border-color)'
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={coin.image} alt={coin.name} style={{ width: '32px', height: '32px' }} />
        <div>
          <h3 style={{ fontSize: '1rem', margin: 0 }}>{coin.name}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {coin.symbol}
          </span>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          ${coin.current_price.toLocaleString()}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px',
          fontSize: '0.9rem',
          color: isPositive ? 'var(--accent-green)' : 'var(--accent-red)',
          marginTop: '5px'
        }}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </div>
      </div>
    </div>
  )
}