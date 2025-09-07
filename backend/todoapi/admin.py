from django.contrib import admin
from .models import Todo
# Register your models here.

class TodeAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'updated_at']
    # exclude = ['completed']
    fieldsets = (
        ("Basic options", {
            'classes' : ['wide'],
            "fields": (
                ['title', 'description']
            ),
        }),
        ("Advance options", {
            'classes' : ['collapse'],
            'fields' : ['completed']
        })
    )
    

admin.site.register(Todo,TodeAdmin)