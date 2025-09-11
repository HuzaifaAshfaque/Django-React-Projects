# user/utils.py
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

token_generator = PasswordResetTokenGenerator()

def generate_token(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)
    return uid, token

def verify_token(uid, token, model):
    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = model.objects.get(pk=user_id)
    except (TypeError, ValueError, OverflowError, model.DoesNotExist):
        return None

    if token_generator.check_token(user, token):
        return user
    return None
