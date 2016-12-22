defmodule Codenames.GameChannel do
  use Phoenix.Channel
  alias Codenames.{GameSupervisor, Game}
  intercept ["message"]

  def join("game:" <> room, _params, socket) do
    GameSupervisor.find_or_create(room)
    previous_events = Game.read(room)

    {:ok, %{previous_events: previous_events}, assign(socket, :room, room)}
  end

  def handle_in("message", payload, socket) do
    "game:" <> room = socket.topic

    GameSupervisor.find_or_create(room)
    Game.add(room, payload)

    broadcast! socket, "message", payload
    {:noreply, socket}
  end

  def handle_out("message", payload, socket) do
    if current_room?(socket.assigns[:room], socket.topic) do
      push socket, "message", payload
    end

    {:noreply,socket}
  end

  defp current_room?(room, "game:" <> room), do: true
  defp current_room?(_, "game:" <> _), do: false
end
