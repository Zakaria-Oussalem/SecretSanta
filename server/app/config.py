from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Secret Santa App"
    database_url: str
    frontend_url: str

    class Config:
        env_file = ".env"


settings = Settings()
