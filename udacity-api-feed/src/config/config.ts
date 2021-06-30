export const config = {
  "dev": {
    'username': 'newton',
    'password': '12345678',
    'database': 'udagram',
    'host': 'udagram.cbd1h54qan9h.us-east-2.rds.amazonaws.com',
    'dialect': 'postgres',
    'aws_region': 'us-east-2',
    'aws_profile': 'default',
    'aws_media_bucket': 'udagram-ms-project-bucket-dev',
    'url': 'http://localhost:8100'
  },
  "prod": {
    'username': 'newton',
    'password': '12345678',
    'database': 'udagram',
    'host': 'udagram.cbd1h54qan9h.us-east-2.rds.amazonaws.com',
    'dialect': 'postgres',
    'aws_region': 'us-east-2',
    'aws_profile': 'default',
    'aws_media_bucket': 'udagram-ms-project-bucket-dev',
    'url': 'http://localhost:8100'
  },
  "jwt":{
    "secret": 'hello'
  }
}

// export const config = {
//   "dev": {
//     "username": process.env.POSTGRESS_USERNAME,
//     "password": process.env.POSTGRESS_PASSWORD,
//     "database": process.env.POSTGRESS_DATABASE,
//     "host":process.env.POSTGRESS_HOST,
//     "dialect": "postgres",
//     "aws_reigion": process.env.AWS_REGION,
//     "aws_profile": process.env.AWS_PROFILE,
//     "aws_media_bucket":process.env.AWS_MEDIA_BUCKET,
//     "url": process.env.URL
//   },
//   "prod": {
//     "username": process.env.POSTGRESS_USERNAME,
//     "password": process.env.POSTGRESS_PASSWORD,
//     "database": process.env.POSTGRESS_DATABASE,
//     "host":process.env.POSTGRESS_HOST,
//     "dialect": "postgres",
//     "aws_reigion": process.env.AWS_REGION,
//     "aws_profile": process.env.AWS_PROFILE,
//     "aws_media_bucket":process.env.AWS_MEDIA_BUCKET,
//     "url": process.env.URL
//   },
//   "jwt":{
//     "secret": process.env.JWT_SECRET
//   }
// }

