import { Link } from "react-router-dom";

export default function EmptyPage() {
    return (
        <>
            <h2>Not Found!</h2>
            <Link to="/">Back to Main</Link>
        </>
    );
}
