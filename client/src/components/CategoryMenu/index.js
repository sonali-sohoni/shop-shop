import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";

import { useStoreContext } from "../../utils/GlobalState";
import {
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";

function CategoryMenu() {
	const [state, dispatch] = useStoreContext();
	const { categories } = state;

	const { data: categoryData } = useQuery(QUERY_CATEGORIES);
	//const categories = categoryData?.categories || [];

	//Push the data retrieved from useQuery hook to State object

	useEffect(() => {
		console.log("useEffect() Ran");
		if (categoryData) {
			console.log("useEffect() Ran on categoryData change");
			dispatch({
				type: UPDATE_CATEGORIES,
				categories: categoryData.categories,
			});
		}
	}, [categoryData, dispatch]);

	const handleClick = (id) => {
		console.log("categorySelected " + id);
		dispatch({
			type: UPDATE_CURRENT_CATEGORY,
			currentCategory: id,
		});
	};

	return (
		<div>
			<h2>Choose a Category:</h2>
			{categories.map((item) => (
				<button
					key={item._id}
					onClick={() => {
						handleClick(item._id);
					}}
				>
					{item.name}
				</button>
			))}
		</div>
	);
}

export default CategoryMenu;
