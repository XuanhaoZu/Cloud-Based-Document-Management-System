import json
import boto3
import os

def lambda_handler(event, context):
    # 初始化 S3 客户端
    s3_client = boto3.client('s3')

    bucket_name = 'cloud-doc-hub-bucket'

    try:
        # 获取存储桶中的所有对象
        response = s3_client.list_objects_v2(Bucket=bucket_name)

        # 提取文件信息
        files = []
        if 'Contents' in response:
            for item in response['Contents']:
                files.append({'name': item['Key'], 'last_modified': item['LastModified']})

        # 返回文件列表
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            'body': json.dumps(files)
        }
    except Exception as e:
        # 错误处理
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            'body': json.dumps({'error': str(e)})
        }
