# Generated by Django 2.0.4 on 2018-05-19 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0006_auto_20180517_0322'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupProgram',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('groupID', models.IntegerField()),
                ('ProgramText', models.CharField(max_length=1500)),
            ],
        ),
    ]
