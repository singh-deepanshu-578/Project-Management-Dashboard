import "./ProjectCard.scss";

const ProjectCard = ({ project }) => {
  const { name, progress, team } = project;

  return (
    <div className="project-card">
      <div className="project-card__header">
        <h3 className="project-card__name">{name}</h3>
        <span className="project-card__progress-text">{progress}%</span>
      </div>
      <div className="project-card__progress-bar">
        <div
          className="project-card__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="project-card__footer">
        <div className="project-card__team">
          {team.map((member, i) => (
            <div
              key={i}
              className="project-card__avatar"
              style={{ left: `${i * 20}px`, zIndex: team.length - i }}
              title={member}
            >
              {member[0]}
            </div>
          ))}
        </div>
        <span className="project-card__members">{team.length} members</span>
      </div>
    </div>
  );
};

export default ProjectCard;
