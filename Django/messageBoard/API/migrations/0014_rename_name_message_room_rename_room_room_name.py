# Generated by Django 5.1.1 on 2024-10-19 09:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0013_rename_room_message_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='name',
            new_name='room',
        ),
        migrations.RenameField(
            model_name='room',
            old_name='room',
            new_name='name',
        ),
    ]