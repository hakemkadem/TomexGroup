# Generated by Django 2.0.4 on 2018-05-17 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='HotelUrl',
            field=models.URLField(null=True),
        ),
    ]
