# Generated by Django 2.0.4 on 2018-05-17 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0003_auto_20180517_0313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='HotelUrl',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
