# Generated by Django 5.1.1 on 2024-09-26 13:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_room_participants_remove_room_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='participants',
        ),
    ]
