import boto3
import os
import json
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    # 解析上传的文件信息
    file_content = event['content']
    file_name = event['filename']

    # S3 客户端初始化
    s3_client = boto3.client('s3')

    try:
        # 将文件上传到S3
        response = s3_client.put_object(
            Bucket=os.environ['S3_BUCKET'],
            Key=file_name,
            Body=file_content
        )
        return {
            "statusCode": 200,
            "body": json.dumps("File uploaded successfully.")
        }
    except ClientError as e:
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error uploading file: {str(e)}")
        }