import '../styles/Tag.css';

type TagProps = {
  name: string;
  status?: boolean;
  modifier?: string;
  onError?: (message: string) => void;
};

const Tag = ({ name, status, modifier, onError }: TagProps) => {
  if (status && modifier) {
    const errorMessage = 'You cannot use both status and modifier props simultaneously.';
    if (onError) {
      onError(errorMessage);
    } else {
      console.error(errorMessage);
    }
    return null;
  }

  const classStatus = status ? 'background--success' : 'background--error';
  const appliedClass = modifier || classStatus;
  return (
    <div className={`tag__status ${modifier} ${appliedClass}`}>
      {name}
    </div>
  );
};

export default Tag;