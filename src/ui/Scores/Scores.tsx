import "./Scores.css";

interface IScoresProps {
  children: React.ReactNode;
}

export const Scores: React.FC<IScoresProps> = ({ children }) => {
  return <div className="scores">{children}</div>;
};
