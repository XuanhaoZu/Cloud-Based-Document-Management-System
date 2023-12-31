import boto3
import json
import base64
from botocore.exceptions import ClientError

# 初始化S3客户端
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # 解析前端传送的JSON数据
        body = json.loads(event['body'])

        # 文件数据通常通过base64编码传输
        file_content = base64.b64decode(body['file_content'])
        file_name = body['file_name']
        bucket_name = 'cloud-doc-hub-bucket'  # 指定的S3 bucket名称

        # 上传文件到S3
        s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_content)

        return {
            'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        'body': json.dumps('uploaded!')
    }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error uploading file: {str(e)}")
        }
