import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// #region agent log
try { fetch('http://127.0.0.1:7242/ingest/4cb57a33-4197-47d9-8146-45206eb5ad6e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:3',message:'Before CSS import',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); } catch(e) {}
// #endregion
import './index.css'
// #region agent log
try { fetch('http://127.0.0.1:7242/ingest/4cb57a33-4197-47d9-8146-45206eb5ad6e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:6',message:'After CSS import',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); } catch(e) {}
// #endregion
import App from './App.jsx'
// #region agent log
try { fetch('http://127.0.0.1:7242/ingest/4cb57a33-4197-47d9-8146-45206eb5ad6e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:9',message:'Before render',data:{rootExists:!!document.getElementById('root')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{}); } catch(e) {}
// #endregion

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// #region agent log
try { fetch('http://127.0.0.1:7242/ingest/4cb57a33-4197-47d9-8146-45206eb5ad6e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:16',message:'After render',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{}); } catch(e) {}
// #endregion