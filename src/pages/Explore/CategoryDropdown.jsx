import { useState, useEffect, useRef } from "react";
import styles from "./CategoryDropdown.module.css";

export default function CategoryDropdown(props) {
	const ref = useRef();
	const [open, setOpen] = useState(false);

	const categories = {
		0: "Vokal",
		1: "Gitar",
		2: "Bass",
		3: "Brass",
		4: "Perkusi",
		5: "Piano",
		6: "Strings",
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (open && ref.current && !ref.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [open]);

	const [checked, setChecked] = useState(
		new Array(Object.keys(categories).length).fill(true)
	);

	const onChange = (idx) => {
		const updatedChecked = checked.map((item, i) =>
			i === parseInt(idx) ? !item : item
		);
		setChecked(updatedChecked);
	};

	const onClear = () => {
		const updatedChecked = new Array(Object.keys(categories).length).fill(true);
		setChecked(updatedChecked);
	};

	const onApply = () => {
		const idxList = checked.map((item, i) => {
			if (item === true) return i;
			return -1;
		});
		const selectedIdx = Object.keys(categories).filter(
			(_, i) => i === idxList[i]
		);
		let selected = [];
		for (const item of selectedIdx) {
			selected.push(categories[item]);
		}
		props.onClick({ instrument: selected });
	};

	const onClickOpen = () => {
		setOpen(!open);
	};

	return (
		<div>
			<button
				className="btn btn-secondary dropdown-toggle ms-md-3 bg-white text-black h-100"
				style={{ border: "1px solid #8F8D8D" }}
				type="button"
				onClick={() => onClickOpen()}
			>
				Category
			</button>
			{open && (
				<div
					className="position-absolute bg-white rounded ms-md-3"
					style={{ border: "1px solid #8F8D8D", width: "300px" }}
					ref={ref}
				>
					<div className="row p-2 px-3">
						<div className="col">
							{Object.keys(categories)
								.filter((_, i) => i < 4)
								.map((key) => {
									return (
										<div key={key} className="my-2">
											<input
												id={categories[key]}
												value={categories[key]}
												name={categories[key]}
												checked={checked[key]}
												onChange={() => onChange(key)}
												style={{ cursor: "pointer" }}
												type="checkbox"
											/>
											<label
												className="ms-2"
												htmlFor={categories[key]}
												style={{ cursor: "pointer" }}
											>
												{categories[key].charAt(0).toUpperCase() +
													categories[key].slice(1)}
											</label>
										</div>
									);
								})}
						</div>
						<div className="col">
							{Object.keys(categories)
								.filter((_, i) => i >= 4)
								.map((key) => {
									return (
										<div key={key} className="my-2">
											<input
												id={categories[key]}
												value={categories[key]}
												name={categories[key]}
												checked={checked[key]}
												onChange={() => onChange(key)}
												style={{ cursor: "pointer" }}
												type="checkbox"
											/>
											<label
												className="ms-2"
												htmlFor={categories[key]}
												style={{ cursor: "pointer" }}
											>
												{categories[key].charAt(0).toUpperCase() +
													categories[key].slice(1)}
											</label>
										</div>
									);
								})}
						</div>
					</div>
					<div
						className="d-flex justify-content-between p-3 mt-2"
						style={{ borderTop: "1px solid #8f8d8d" }}
					>
						<button
							className={`${styles.clear} border-0 fw-bolder`}
							onClick={() => onClear()}
						>
							Revert
						</button>
						<button
							className={`${styles.apply} border-0 rounded px-3 py-1`}
							onClick={() => onApply()}
						>
							Apply
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
