# Generated by Django 4.0.4 on 2022-10-13 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hello", "0002_expectation"),
    ]

    operations = [
        migrations.AddField(
            model_name="expectation",
            name="current",
            field=models.BooleanField(default=True),
        ),
    ]
