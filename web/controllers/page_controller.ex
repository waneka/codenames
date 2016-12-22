defmodule Codenames.PageController do
  use Codenames.Web, :controller

  def index(conn, _params) do
    redirect conn, to: "/public"
  end

  def show(conn, _params) do
    conn
    |> put_layout(false)
    |> render("show.html")
  end
end
