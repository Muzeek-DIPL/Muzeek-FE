import Comment from './Comment';
import CommentInput from './CommentInput';
import mockData from '../../mockComment.json';

export default function CommentList() {
	return (
		<>
			<h5 className="fw-bolder">Komentar ({mockData.comments.length})</h5>
			<CommentInput />
			{mockData.comments.map((item) => (
				<Comment
					key={item.id}
					id={item.id}
					commenter={item.commenter}
					img={item.commenter_img}
					comment={item.comment}
					dateCommented={item.date}
				/>
			))}
		</>
	);
}
