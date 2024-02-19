<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="assets/logo/CodeforChanges.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Recycle Guide</h3>

   <p align="center">
    An innovative app to revolutionize recycling through technology!
    <br />
    <a href="https://github.com/CodeforChanges/recycle-backend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CodeforChanges/recycle-backend">View Demo</a>
    ·
    <a href="https://github.com/CodeforChanges/recycle-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/CodeforChanges/recycle-backend/issues">Request Feature</a>
  </p>
</div>

## [TABLE OF CONTENTS](#table-of-contents)
[1.](#about-the-project)  **&nbspAbout The Project**
  
2. [**Start Guide**](#start-guide)  
   2-1. [Prerequisites](#prerequisites)  
   2-2. [Installation](#installation)
   
3. [**Stacks**](#stacks)  
   3-1. [Environment](#environment)  
   3-2. [Config](#config)  
   3-3. [Development](#development)  
   3-4. [Communication](#communication)
   
4. [**API Address**](#api-address)    
   4-1. [Auth](#auth)  
   4-2. [User](#user)  
   4-3. [Post](#post)  
   4-4. [Comment](#comment)  
   4-5. [Like](#like)  
   4-6. [Search](#search)    
   4-7. [Model](#model)  
   
5. [**env**](#env)

6. [**Usage**](#usage)

7. [**Contributing**](#contributing)

8. [**License**](#license)

9. [**Contact**](#contact)


## [About The Project](#table-of-contents)

In a world increasingly concerned with sustainability, the Recycle Guide app serves as a beacon of innovation. Developed with Flutter, this app not only identifies waste types through photo recognition but also educates users on proper recycling methods. It's designed to make recycling accessible and informative, encouraging environmentally friendly practices among its users.

Why Recycle Guide?

- **Educational:** Learn how to recycle different materials properly.
- **Innovative:** Utilizes photo recognition to identify waste types.
- **Community-driven:** Share and discover recycling tips within a like-minded community.
- **Informative:** Get insights on how recycled materials can be repurposed.

We're on a mission to empower individuals to make a difference in their communities through responsible waste management. Join us in making the world a cleaner, greener place.


## [Start Guide](#table-of-contents)

### [Prerequisites](#table-of-contents)
For building and running the application you need:

* An IDE

<img src="https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 

### [Installation](#table-of-contents)

1. Clone the repo
   
   ```sh
   $ git clone https://github.com/CodeforChanges/recycle-backend.git
   ```
2. Install and run

   ```sh
   export DATABASE_URL=your_postgres_database_url
   ```
   ```sh
   $ npm install
   $ npm run start
   ```


## [Stacks](#table-of-contents)

### [Environment](#table-of-contents)
<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> 

### [Config](#table-of-contents)
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### [Development](#table-of-contents)
<img src="https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white"> <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> ![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFCA28?style=for-the-badge&logo=hugging%20face&logoColor=white)


### [Communication](#table-of-contents)
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/googlemeet-00897B?style=for-the-badge&logo=googlemeet&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">


## [API Address](#table-of-contents)
```sh
'Accept: application/json' URL:PORT
```

### [Auth](#table-of-contents)
```sh
'POST' /auth                    # Sign in
  REQUEST >> {"user_email": "string", "user_password": "string"}
  RESPONSE >> {"access_token": "string"}
```

### [User](#table-of-contents)
```sh
'GET' /user                    # Get User data
  RESPONSE >> {"user_id": 0, "user_email": "string", "user_image": "string", "user_name": "string", "user_nickname": "string", "user_created_at": "2024-02-19T12:39:35.547Z"}


'POST' /user                    # Sign up
  REQUEST >> {"post_content": "string", "post_images": ["string"], "post_tags": ["string"]}
  RESPONSE >> {"user_id": 0, "user_email": "string", "user_name": "string", "user_nickname": "string"}


'PATCH' /user                    # Update User data
  REQUEST >> {"post_content": "string", "post_images": ["string"], "post_tags": ["string"]}
  RESPONSE >> {"user_nickname": "string", "user_image": "string"}


'DELETE' /user                    # Delete User
  REQUEST >> {"post_id": 0}
  RESPONSE >> {"user_id": 0}
```
```sh
'GET' /user/{user_id}                    # Get another User data
  RESPONSE >> {"user_id": 0, "user_email": "string", "user_image": "string", "user_name": "string", "user_nickname": "string", "user_created_at": "2024-02-19T12:39:35.547Z"}
```

### [Post](#table-of-contents)
* PostDto
```sh
  {
    "post_id": 0,
    "post_content": "string",
    "post_owner_id": 0,
    "reg_date": "2024-02-19T12:44:52.689Z",
    "post_comments": [
      {
        "comment_content": "string",
        "comment_owner": {
          "user_id": 0,
          "user_nickname": "string",
          "user_image": "string"
        },
        "comment_id": 0,
        "reg_date": "2024-02-19T12:44:52.689Z"
      }
    ],
    "post_images": [
      {
        "image_id": 0,
        "image_post_id": 0,
        "image_link": "string",
        "reg_date": "2024-02-19T12:44:52.689Z"
      }
    ],
    "post_owner": {
      "user_id": 0,
      "user_nickname": "string",
      "user_image": "string",
      "follower_count": 0
    },
    "likesCount": 0,
    "isLiked": true
  }
```

```sh
'GET' /post                    # Get Post and related additional information
  RESPONSE >> PostDto



'POST' /post                    # Create Post
  REQUEST >> {"user_email": "string", "user_password": "string", "user_name": "string", "user_nickname": "string", "user_image": "string"}
  RESPONSE >> PostDto
```
```sh
'PATCH' /post/{post_id}                    # Update Post
  REQUEST >> {"user_nickname": "string", "user_image": "string"}
  RESPONSE >> {"post_content": "string", "post_images": [{"image_id": 0, "image_link": "string"}]}


'DELETE' /post/{post_id}                    # Delete Post
  REQUEST >> {"user_id": 0}
  RESPONSE >> {"post_id": 0}
```

### [Comment](#table-of-contents)
```sh
'POST' /comment                    # Create Comment on Specific Post
  REQUEST >> {"comment_content": "string", "post_id": 0}
  RESPONSE >> {"comment_id": 0, "comment_content": "string", "comment_owner_id": 0, "comment_post_id": 0, "reg_date": "2024-02-19T12:48:47.059Z", "comment_owner": {}}
```
```sh
'PATCH' /comment/{comment_id}                    # Update Comment
  REQUEST >> {"comment_content": "string"}
  RESPONSE >> {"comment_id": 0, "comment_content": "string"}


'DELETE' /comment/{comment_id}                    # Delete Comment
```

### [Like](#table-of-contents)
```sh
'POST' /like                    # Add Like
  REQUEST >> {"post_id": 0}
  RESPONSE >> {  "like_id": 0}
```
```sh
'DELETE' /like/{post_id}                    # Cancel Like
```

### [Search](#table-of-contents)
```sh
'POST' /search                    # Search based on Post content and hashtags
  REQUEST >> {"keyword": "string"}
  RESPONSE >> PostDto
```

### [Model](#table-of-contents)



## [env](#table-of-contents)
* JWT_SECRET
* DATABASE_URL (POSTGRES_URL)
* NODE_ENV
* PORT


## [Usage](#table-of-contents)
Recycle Guide can be used in several ways to promote recycling and sustainability:

Waste Identification: Snap a photo of your waste, and the app will tell you what type of material it is and how to recycle it properly. Community Engagement: Share your recycling achievements and tips with the community, fostering a culture of sustainability. Educational Resources: Access a wealth of information on recycling practices and the impact of recycling on the environment.


## [Contributing](#table-of-contents)
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project Create your Feature Branch (git checkout -b feature/AmazingFeature) Commit your Changes (git commit -m 'Add some AmazingFeature') Push to the Branch (git push origin feature/AmazingFeature) Open a Pull Request


## [License](#table-of-contents)
Distributed under the MIT License. See LICENSE.txt for more information.


## [Contact](#table-of-contents)
https://github.com/CodeforChanges/recycle-backend(https://github.com/CodeforChanges/recycle-backend)
