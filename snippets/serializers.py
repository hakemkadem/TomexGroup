from rest_framework import serializers
from snippets.models import Post

class PostSerializer (serializers.ModelSerializer):
    class Meta:
        model = Post;
        fields = ['pk','user','title', 'contents', 'timestamp']
