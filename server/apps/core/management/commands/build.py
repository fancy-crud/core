from django.core.management.base import BaseCommand
from django.utils import timezone

from os.path import basename
from zipfile import ZipFile
import datetime
import shutil
import os

from server.settings import BASE_DIR


class Command(BaseCommand):

    help = 'Create zip file for django project'

    def handle(self, *args, **kwargs):
        os.system('pyclean -v .')

        if not os.path.isdir('dist'):
            os.mkdir('dist')
        else:
            shutil.rmtree('dist')
            os.mkdir('dist')

        shutil.copy('.env', 'dist/.env')
        
        now = datetime.datetime.now().strftime('%Y-%m-%d-%H%m')

        with ZipFile(f'dist/{now}.zip', 'w') as zipObj:
            for (folderName, subfolders, filenames) in os.walk('.'):
                skip_folders = ['.git', '.vscode', 'dist', 'drf_generators']
                skip = False

                for skip_folder in skip_folders:
                    if skip_folder in folderName:
                        skip = True
                        break

                if skip:
                    continue

                for filename in filenames:
                    skip_files = ['.gitignore', 'README.md', '.env']
                    skip = False

                    for skip_file in skip_files:
                        if skip_file in filename:
                            skip = True
                            break
                    
                    if skip:
                        continue

                    filePath = os.path.join(folderName, filename)
                    zipObj.write(filePath)

        print('\nDistribution zip file was created')
