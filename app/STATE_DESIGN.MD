{

	app: 
	{
		isfetching: false,
		// App related data will be stored in the app.data object
		// this object will store data that will be used globally
		data:
		{
			messages: // Message badge data
			{
				updated_at: <date_updated>,
				count: <message_count>
			}
		}
	},
	// Sessions will store session information
	session: 
	{
		isFetching: false,
		isLoggedIn: false,
		sessionCookie: "<session_cookie>", // Logged in user session cookie
		sesssionToken: "<session_token>" // Future proof
	},
	user:
	{
			isFetching: false,
			user_id: <user_id>,
			updated_at: <date_updated>,
			created_at: <date_created>,
			email: <user_email>,
			first_name: <user_first_name>,
			last_name: <user_last_name>,
			details: // Future proof
			{
				// Details regarding the user membership will be
				// stored in this details object. The exact
				// details are pending further dicussion.
			}
			user_image:
			{
				large: <large_image_url>,
				medium: <medium_image_url>,
				small: <small_image_url>,
				thumbnail: <thumbnail_image_url>
			},
	}
	// NOTE: Each screen that requires a fetch from the server
	// will have it's own object.
	// Screen specific data will be stored in the screens object 
	screens:  
	{ 
		isFetching: false,
		projects: 
		{
			// Available filters (all: returns all sorted by date, 
			// distance: Returns all sorted by distance)
			filter: <filter_type>, 
			updated_at: <date_updated>,
			data:
			[
				{
					project_id: <project_id>,
					created_at: <date_created>,
					updated_at: <date_updated>,
					user:
					{
						user_id: <user_id>,
						email: <user_email>,
						first_name: <user_first_name>,
						last_name: <user_last_name>,
						user_image:
						{
							large: <large_image_url>,
							medium: <medium_image_url>,
							small: <small_image_url>,
							thumbnail: <thumbnail_image_url>
						},
					},
					details:
					{
						title: "<project_title>",
						description: "<project_description>",
						misc:{
							// This object will store any extra fields
							// that do not fit in a category
						}
						status:
						{
							start_date: <project_start_date>,
							end_date: <poject_end_date>,
							// Project status example: In Progress, planning, complete.
							status: <project_status>,
						}
						location: 
						{	
							country: <project_country>,
							state: <project_state>,
							city: <project_city>,
							longitude: <project_location_latitude>,
							latitude: <project_location_logitude>,
						},
						images: // Will return an array of images uploaded by user
						[
							{
								large: <large_image_url>,
								medium: <medium_image_url>,
								small: <small_image_url>,
								thumbnail: <thumbnail_image_url>
							},
							{
								// Will mirror first object in image array
							},
							{
								// Will mirror first object in image array
							}
						],
						comments: // Future proof
						[
							{
								created_at: <date_created>,
								updated_at: <date_updated>,
								comment: <posted_message>,
								author:{
									user_id: <user_id>,
									email: <user_email>,
									first_name: <user_first_name>,
									last_name: <user_last_name>,
								}

							},
							{
								created_at: <date_created>,
								updated_at: <date_updated>,
								comment: <posted_message>,
								author:{
									user_id: <user_id>,
									email: <user_email>,
									first_name: <user_first_name>,
									last_name: <user_last_name>,
								}

							},
						],
					}
				},
				{
					// Will mirror structure of first object in array
				},
				{
					// Will mirror structure of first object in array
				}
			],
		},
		myProjects:  // Future proof
		{ 
			// Structure will mirror that of projects screen object
			// Data object will only be populated by projects the logged in user has created
		}
		favoriteProjects: // Future proof
		{ 
			// Structure will mirror that of projects screen object
			// Data object will only be poplated by projects the logged in user has favorited.
		},
		messages:
		{
			filter: <filter_type>, // Unread, read
			updated_at: <update_date>,
			data:	
			[
					{
						thread_id: <thread_id>
						isRead: false, // Will be true if the thread is visited
						created_at: <date_thread_created>
						updated_at: <date_thread_updated>
						user:{
							user_id: <user_id>,
							email: <user_email>,
							first_name: <user_first_name>,
							last_name: <user_last_name>,
							user_image:
							{
								large: <large_image_url>,
								medium: <medium_image_url>,
								small: <small_image_url>,
								thumbnail: <thumbnail_image_url>
							},
						},
						thread_messages:
						[
							{
								created_at: <date_message_created>,
								updated_at: <date_message_created>,
								message: <thread_message_string>,
								author:{
									user_id: <user_id>,
									email: <user_email>,
									first_name: <user_first_name>,
									last_name: <user_last_name>,
									user_image:
									{
										large: <large_image_url>,
										medium: <medium_image_url>,
										small: <small_image_url>,
										thumbnail: <thumbnail_image_url>
									},
								},
								
							},
							{
								// Will mirror structure of the first object in thread array
							}
						]
					},
					{
						// Will mirror structure of first object in array
					}
		
				]
		}
	}

}