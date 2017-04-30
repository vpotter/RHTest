from django import forms
from django.db import transaction
from django.contrib import admin
from .models import AdminUser


class AdminUserForm(forms.ModelForm):
    _password = forms.CharField(
        label='New password', max_length=128, required=False)

    @transaction.atomic
    def save(self, commit=True):
        _password = self.cleaned_data.get('_password', None)
        user = super().save(commit=commit)
        if _password:
            user.set_password(_password)
        return user

    class Meta:
        model = AdminUser
        exclude = ('password',)


class UserAdmin(admin.ModelAdmin):
    fields = ('username', '_password', 'is_active', 'is_staff', 'is_superuser')
    list_display = ('username', )

    form = AdminUserForm


admin.site.register(AdminUser, UserAdmin)
