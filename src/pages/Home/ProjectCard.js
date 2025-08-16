import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./Home.css";

function ProjectCard({ project }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImage((prev) => (prev + 1) % project.images.length),
    onSwipedRight: () =>
      setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length),
    trackMouse: true,
  });

  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="carousel" {...handlers}>
        <img src={project.images[currentImage]} alt={project.title} />
      </div>
      <span className={`status ${project.status.toLowerCase()}`}>{project.status}</span>
    </div>
  );
}

export default ProjectCard;
