import { useState, useEffect } from 'react'
import { Activity, RefreshCw } from 'lucide-react'
import CoinCard from './components/CoinCard'

export default function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCoins = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false'
      )
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      setCoins(data)
    } catch (err) {
      setError('Failed to fetch market data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={32} color="var(--accent-blue)" />
          <h1 style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>CryptoPulse</h1>
        </div>
        
        <button 
          onClick={fetchCoins}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--panel-bg)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
          {loading ? 'Syncing...' : 'Refresh'}
        </button>
      </header>

      {/* Content */}
      {error && (
        <div style={{ background: '#da363320', color: '#ff7b72', padding: '16px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #da3633' }}>
          {error}
        </div>
      )}

      {loading && coins.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '50px' }}>
          Fetching live market data...
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '20px' 
        }}>
          {coins.map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  )
}