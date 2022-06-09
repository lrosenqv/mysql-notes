import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/userpage/Dashboard';
import { NotFound } from './components/NotFound';
import { Folder } from './components/userpage/Folder';
import { Notes } from './components/userpage/Notes';
import { NoteEditor } from './components/editor/NoteEditor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/notes" element={<Notes />} />
          </Route>
          <Route path="/folder/:id" element={<Folder/>} />
          <Route path="/editor/:nId" element={<NoteEditor/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
