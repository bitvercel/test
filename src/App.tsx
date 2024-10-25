import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import { ProjectsList } from '@/components/projects/ProjectsList';
import { ProjectDetails } from '@/components/projects/ProjectDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProjectsList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;