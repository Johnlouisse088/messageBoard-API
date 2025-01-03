# Generated by Django 5.1.1 on 2024-10-13 03:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0010_alter_room_participants_alter_room_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='participants',
            field=models.ManyToManyField(related_name='room_participants', to=settings.AUTH_USER_MODEL),
        ),
    ]
