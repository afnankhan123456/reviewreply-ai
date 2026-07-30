import React from 'react';
import './liquid-glass.css';

export default function Page() {
  return (
    <main style={{
      minHeight:'100vh',
      display:'grid',
      placeItems:'center',
      background:'#050505',
      padding:'40px'
    }}>
      <div className="liquid-glass" style={{
        width:'380px',
        padding:'24px',
        color:'#fff'
      }}>
        <div style={{
          width:56,height:56,borderRadius:16,
          background:'linear-gradient(180deg,#9b5cff,#6d32ff)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:24,marginBottom:20
        }}>
          ⭐
        </div>

        <div style={{opacity:.7,fontSize:14}}>Total Reviews</div>

        <div style={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'end',
          marginTop:8
        }}>
          <h1 style={{fontSize:48,margin:0,fontWeight:700}}>1,248</h1>
          <span style={{color:'#8b5cf6',fontWeight:600}}>+12%</span>
        </div>

        <svg viewBox="0 0 320 70" width="100%" height="70" style={{marginTop:24}}>
          <path
            d="M0 55 C35 48 60 20 95 30 S150 60 190 40 S250 18 320 30"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </main>
  );
}
