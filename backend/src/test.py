from . import database
from . import models


db_gen = database.get_db()
db = next(db_gen)

tags = db.query(models.Tag).all()
