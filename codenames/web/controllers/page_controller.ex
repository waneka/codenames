defmodule Codenames.PageController do
  use Codenames.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
