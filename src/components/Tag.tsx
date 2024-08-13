import '../styles/Tag.css';

type TagProps = {
    name: string,
    status?: boolean,
    modifier?: string,
};

const Tag = ({name, status, modifier}: TagProps) => {
    if(status !== undefined) return (
        <div
            className={`
                tag__status
                ${status ? 'background--success' : 'background--error'}
            `}
        >
            {name}
        </div>
    );

    if (modifier !== undefined) return (
        <div className={`tag__status ${modifier}`}>
            {name}
        </div>
    );

    return (
        <div className={`tag__status ${modifier}`}>
            {name}
        </div>
    );
};
export default Tag;