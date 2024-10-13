# Generated by Django 5.1.1 on 2024-10-13 03:38

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0011_alter_room_participants'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='participants',
            field=models.ManyToManyField(related_name='participated_rooms', to=settings.AUTH_USER_MODEL),
        ),
    ]