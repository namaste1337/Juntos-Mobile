


export default function (state = null, action) {
    switch (action.type) {
        case 'USER_SIGNED_ON':
            return action.payload;
            break;
    }
    return state;
}

// export default



// export default function(){
// return {
// 		id: 3,
// 		first: "Madison",
// 		last: "Willimas",
// 		age: 24,
// 		description: "Madi likes her dog but it is really annoying",
// 		thumbnail: "http://i.imgur.com/4EMtxHB.png"
// 	}
// }


