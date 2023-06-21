import {useParams} from "react-router-dom";

function PendingReview() {
    const {id}= useParams()
    console.log(id)
    return (
        <div>pendingReview</div>
    );
}

export default PendingReview;