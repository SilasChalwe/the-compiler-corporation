import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import "./Home.css";

export const projectsData = [
  // ... your 20 project objects here (same as you provided)
];

function Home() {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // number of projects per page

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter(p => p.status === filter);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to The Compiler Corporation</h1>
        <p>Your hub for innovative tech solutions and digital platforms.</p>
      </section>

      <section className="projects">
        <h2>Our Projects</h2>

        <div className="filter-buttons">
          {["All", "Ongoing", "MVP", "Finished"].map(status => (
            <button
              key={status}
              className={filter === status ? "active" : ""}
              onClick={() => {
                setFilter(status);
                setCurrentPage(1); // reset page when filter changes
              }}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="project-list">
          {currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
