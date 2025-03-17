from django.core.management.base import BaseCommand
from users.models import Role

class Command(BaseCommand):
    help = 'Setup initial roles and permissions'

    def handle(self, *args, **kwargs):
        # Create citizen role
        Role.objects.get_or_create(
            code='CITIZEN',
            defaults={
                'name': 'Citizen',
                'is_official': False,
                'permissions': {
                    'modules': ['vyapara'],
                    'actions': ['view', 'create']
                }
            }
        )

        # Create Trade License Officer role
        Role.objects.get_or_create(
            code='TLO',
            defaults={
                'name': 'Trade License Officer',
                'is_official': True,
                'permissions': {
                    'modules': ['vyapara'],
                    'actions': ['view', 'create', 'update', 'delete', 'approve', 'reject']
                }
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully created roles')) 